import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize app
app = Flask(__name__)
CORS(app)

# Connect to SQLite database
def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('studentDB.sqlite')
    except sqlite3.Error as e:
        print(e)
    return conn

# Create table
def create_table(conn):
    try:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS students (
                            id INTEGER PRIMARY KEY,
                            firstName TEXT NOT NULL,
                            lastName TEXT NOT NULL,
                            email TEXT UNIQUE NOT NULL,
                            dateOfBirth DATE NOT NULL
                        );''')
        conn.commit()
    except sqlite3.Error as e:
        print(e)

# Create a Student
@app.route('/student', methods=['POST'])
def add_student():
    conn = create_connection()
    create_table(conn)

    firstName = request.json['firstName']
    lastName = request.json['lastName']
    email = request.json['email']
    dateOfBirth = request.json['dateOfBirth']

    cursor = conn.cursor()
    cursor.execute("INSERT INTO students (firstName, lastName, email, dateOfBirth) VALUES (?, ?, ?, ?)",
                   (firstName, lastName, email, dateOfBirth))
    conn.commit()

    cursor.execute("SELECT * FROM students WHERE email=?", (email,))
    row = cursor.fetchone()

    student = {
        'id': row[0],
        'firstName': row[1],
        'lastName': row[2],
        'email': row[3],
        'dateOfBirth': row[4]
    }

    return jsonify(student), 201

# Get All Students
@app.route('/student', methods=['GET'])
def get_students():
    conn = create_connection()
    create_table(conn)

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students")
    rows = cursor.fetchall()

    students = []
    for row in rows:
        student = {
            'id': row[0],
            'firstName': row[1],
            'lastName': row[2],
            'email': row[3],
            'dateOfBirth': row[4]
        }
        students.append(student)

    return jsonify(students)

# Get Single Student
@app.route('/student/<int:id>', methods=['GET'])
def get_student(id):
    conn = create_connection()
    create_table(conn)

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE id=?", (id,))
    row = cursor.fetchone()

    if not row:
        return jsonify({'message': 'Student not found'}), 404

    student = {
        'id': row[0],
        'firstName': row[1],
        'lastName': row[2],
        'email': row[3],
        'dateOfBirth': row[4]
    }

    return jsonify(student)

# Update a Student
@app.route('/student/<int:id>', methods=['PUT'])
def update_student(id):
    conn = create_connection()
    create_table(conn)

    # Check if the request contains JSON data
    if not request.json:
        return jsonify({'error': 'No input data provided'}), 400

    # Extract data from the request
    firstName = request.json.get('firstName')
    lastName = request.json.get('lastName')
    email = request.json.get('email')
    dateOfBirth = request.json.get('dateOfBirth')

    # Validate input data
    if not all([firstName, lastName, email, dateOfBirth]):
        return jsonify({'error': 'Missing data'}), 400

    cursor = conn.cursor()

    # Update the student record
    cursor.execute("UPDATE students SET firstName=?, lastName=?, email=?, dateOfBirth=? WHERE id=?",
                   (firstName, lastName, email, dateOfBirth, id))
    if cursor.rowcount == 0:
        return jsonify({'error': 'Student not found'}), 404

    conn.commit()

    # Fetch the updated student record
    cursor.execute("SELECT * FROM students WHERE id=?", (id,))
    row = cursor.fetchone()

    if row is None:
        return jsonify({'error': 'Student not found'}), 404

    student = {
        'id': row[0],
        'firstName': row[1],
        'lastName': row[2],
        'email': row[3],
        'dateOfBirth': row[4]
    }

    return jsonify({'message': 'Student updated successfully', 'student': student})

# Delete Student
@app.route('/student/<int:id>', methods=['DELETE'])
def delete_student(id):
    conn = create_connection()
    create_table(conn)

    cursor = conn.cursor()
    cursor.execute("DELETE FROM students WHERE id=?", (id,))
    conn.commit()

    return jsonify({'message': 'Student deleted successfully'})

# Run Server
if __name__ == '__main__':
    app.run(debug=True)