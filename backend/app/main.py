from fastapi import FastAPI

app = FastAPI(title='Eu Barbeiro API')

@app.get('/')
def root():
    return {'message': 'API Eu Barbeiro funcionando!'}

