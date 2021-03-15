from api import create_app

app = create_app()

@app.route('/', methods = ['GET'])
def index():
    return "hello world"


if __name__ == '__main__':
    app.run(debug=True)