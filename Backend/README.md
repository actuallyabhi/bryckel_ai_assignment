# Django Backend

## Installation
1. Create a virtual environment
2. Install the requirements
```bash
pip install -r requirements.txt
```
3. Copy the .env.example file to .env and fill in the required fields
```bash
cp .env.example .env
```
4. Run the migrations
```bash
python manage.py migrate
```
5. Run the server
```bash
python manage.py runserver
```

The app should now be running on http://localhost:8000