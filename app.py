from flask import Flask, render_template, request
import whois

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    domain_info = None
    if request.method == 'POST':
        domain = request.form.get('domain')
        try:
            w = whois.whois(domain)
            domain_info = str(w)
        except Exception as e:
            domain_info = f"Error: {e}"
    return render_template('index.html', domain_info=domain_info)

if __name__ == '__main__':
    app.run(debug=True)
