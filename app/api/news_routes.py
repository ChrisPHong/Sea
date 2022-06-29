from flask import Blueprint, request, jsonify
import json
import finnhub


news_routes = Blueprint('news', __name__)

@news_routes.route('/', methods=['POST'])
def get_news():
    finnhub_client = finnhub.Client(api_key="catogbiad3ia1n9mnpsg")
    ticker = request.json['ticker'].upper()
    print("THIS IS THE TICKERRRRR",ticker)
    return jsonify((finnhub_client.company_news(ticker, _from="2022-06-01", to="2022-06-27")))
