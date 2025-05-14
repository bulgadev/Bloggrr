from flask import Flask, jsonify, request, session #jsonify is used to send info to react via json files
from flask_cors import CORS
import sqlite3
import bcrypt
import os
from dotenv import load_dotenv
from crypto import hash_password, check_password
import re

# Ensure environment variables are loaded
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
CORS(app, supports_credentials=True)

conn = sqlite3.connect("my_database.db", check_same_thread=False)  # Allow connection sharing across threads
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT, email TEXT)")
cursor.execute("CREATE TABLE IF NOT EXISTS blogs (title TEXT PRIMARY KEY, content TEXT, data TEXT, author TEXT)")
conn.commit()



def register(user, hpassword, email):
    try:
        cursor.execute("SELECT * FROM users WHERE username = ?", (user,))
        existing_user = cursor.fetchone()
        print(f"Existing user: {existing_user}")  # Debugging line
        if existing_user:
            print("Existing user awoidjmioawdjmiouawnhjdio")
            return jsonify({"message": "Theres already a user with this name"})

        
        cursor.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (user, hpassword, email))
        conn.commit()
        return jsonify({"message": "Registered", "redirect": "/login"})

    except sqlite3.IntegrityError:
        return jsonify({"message": "Theres already a user with this name"})
    
    
def login(username, password):
    cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
    fetch = cursor.fetchone()

    if fetch is None:
        print("User not found")
        return jsonify({"message": "User not found or password"})
        
    stored = fetch[0]

    if check_password(password, stored):
        session['username'] = username
        global user
        user = session['username']
        print(f"Welcome {user}")
        return jsonify({"message": "Login successful", "redirect": "/dashboard"})
    else:
        return jsonify({"message": "User not found or password"})
    
def write(title, content, username, dataAtual):
    if title == "" or content == "":
        return jsonify({"message": "Title or content empty"})
    cursor.execute("INSERT INTO blogs (title, content, data, author) VALUES (?, ?, ?, ?)", (title, content, dataAtual, username))
    conn.commit()
    return jsonify({"message": "Submission successful", "redirect": "/dashboard"})

#checks if the email PATTERN is valid
#maybe will be changed in the future, cuz if the email pattern is right but it doesnt exist it works.
def validEmail(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

@app.route('/api/register', methods=['POST', "GET"])
def registerpost():
    # Takes the data from the JSON as data (we use data['variable name'] to get a var)
    data = request.get_json()

    user = data['username']
    email = data['email']
    password = data['Password']
    hpassword = hash_password(password)
    print(f"U are { user } ur email is { email } ur password is { password }")
    if validEmail(email) == False:
        return jsonify({"message": "Not valid email"})
    # Return the result of the register function
    return register(user, hpassword, email)

@app.route('/api/login', methods=['POST', "GET"])
def loginpost():
    # Takes the data from the JSON as data (we use data['variable name'] to get a var)
    data = request.get_json()

    user = data['username']
    password = data['Password']
    return login(user, password)

@app.route('/api/info', methods=['POST', "GET"])
def info():
    username = session.get('username')  # Retrieve the username from the session
    if username:
        print(username)
        return jsonify({"username": username, "message": "sessioned"})
    else:
        print("No user in session")
        print(session)
        return jsonify({"message": "No user logged in"})
    
@app.route('/api/blogs', methods=["POST", "GET"])
def blogs():
    username = session.get('username')
    if not username:
        return jsonify({"message": "No user logged in"}), 401  # Handle case where no user is logged in

    cursor.execute("SELECT title, content FROM blogs WHERE author = ?", (username,))
    fetch = cursor.fetchall()

    if fetch:
        #checks all rows in the fetch and makes this dicionarry with the blogs
        blogs = [{"title": row[0], "content": row[1]} for row in fetch]
        return jsonify({"blogs": blogs})
    else:
        #Handle case where no blogs are found
        return jsonify({"message": "You have no blogs yet."})
    
@app.route('/api/blogsPage', methods=["POST", "GET"])
def blogsPage():
    # Fetch all blogs from the database without filtering by username
    cursor.execute("SELECT title, content FROM blogs")
    fetch = cursor.fetchall()

    if fetch:
        # Create a dictionary with all blogs
        blogs = [{"title": row[0], "content": row[1]} for row in fetch]
        return jsonify({"blogs": blogs})
    else:
        # Handle case where no blogs are found
        return jsonify({"message": "No blogs found."})
        
@app.route('/api/blog/<title>', methods=["POST", "GET"])
def blogPage(title):
    # Fetch all blogs from the database without filtering by username
    cursor.execute("SELECT title, content FROM blogs WHERE title = ?", (title,))
    fetch = cursor.fetchone()

    if fetch:
        # Create a dictionary with the blog
        blog = {"title": fetch[0], "content": fetch[1]}
        return jsonify({"blog": blog}) 
    else:
        # Handle case where no blogs are found
        return jsonify({"message": "No blogs found."})


@app.route('/api/write', methods=["POST", "GET"])
def writepost():
        # Takes the data from the JSON as data (we use data['variable name'] to get a var)
    data = request.get_json()

    title = data['Title']
    content = data['Content']
    dataAtual = data['Date']
    username = session.get('username')
    if not username:
        return jsonify({"message": "No user logged in"}), 401  # Handle case where no user is logged in
    return write(title, content, username, dataAtual)
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
