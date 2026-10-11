"""
Flask backend for the Docker Compose lab.

This backend exposes a small REST API that both frontends talk to,
and it stores/reads data from a shared MongoDB database.

Endpoints:
    POST /api/messages  -> save a new text message
    GET  /api/messages  -> return all saved messages (newest first)
"""

import os
from datetime import datetime, timezone

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, DESCENDING

app = Flask(__name__)

# Allow requests from any origin
CORS(app)

# ---------------------------------------------------------------------------
# MongoDB connection
# ---------------------------------------------------------------------------
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(MONGO_URI)
db = client["dockerlab"]
messages_collection = db["messages"]


@app.route("/api/messages", methods=["POST"])
def create_message():
    try:
        data = request.get_json(silent=True) or {}
        text = data.get("text", "").strip()

        if not text:
            return jsonify({"error": "Text cannot be empty"}), 400

        messages_collection.insert_one({
            "text": text,
            "createdAt": datetime.now(timezone.utc)
        })

        return jsonify({"message": "Saved successfully"}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/messages", methods=["GET"])
def get_messages():
    try:
        cursor = messages_collection.find({}, {"_id": 0}).sort("createdAt", DESCENDING)

        results = []
        for doc in cursor:
            created_at = doc.get("createdAt")

            results.append({
                "text": doc.get("text", ""),
                "createdAt": created_at.isoformat() if created_at else None
            })

        return jsonify(results), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/")
def home():
    return jsonify({"status": "Backend is working"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
