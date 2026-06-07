from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pipeline import parse_pipeline_payload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: dict):
    return parse_pipeline_payload(payload)
