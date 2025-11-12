## Python

| Purpose | Library | Notes |
|---|---:|---|
| Web Framework | Flask | Core API layer |
| Database Integration | Flask-PyMongo | MongoDB connector |
| CORS Handling | Flask-Cors | Allow frontend (Next.js) requests |
| Environment Variables | python-dotenv | Manage .env configs securely |
| Linting | Ruff | Fast code linting |
| Installer | uv | Fast Python package installer |
| Data Utilities | Pandas (basic) | Optional — for CSV import/export |
| Logging | built-in logging / loguru | For debugging/log tracking |

### 🧩 Optional / Add Later

| Feature | Library | Use Case |
|---|---:|---|
| API Structuring | flask-restful | Clean resource-based APIs |
| Validation | marshmallow | Validate user-uploaded data |
| Testing | pytest | Unit and API testing |
| Async Support | flask-smorest or FastAPI | If scaling later |

### Learning resources
- Code basics: https://www.youtube.com/watch?v=eykoKxsYtow&list=PLeo1K3hjS3uv5U-Lmlnucd7gqF-3ehIh0  
- Corey Schafer playlist: https://www.youtube.com/watch?v=YYXdXT2l-Gg&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU
- (Add more resources as needed)

## Git Commands

| Command | Description |
|---|---|
| `git clone <repository>` | Clone a repository into a new directory |
| `git add <file>` | Stage changes for the next commit |
| `git commit -m "<message>"` | Commit staged changes with a message |
| `git push` | Push local commits to the remote repository |
| `git diff` | Show changes between commits, commit and working tree, etc. |
| `git status` | Show the working tree status |
| `git pull` | Fetch from the remote repository and merge |
| `git branch` | List, create, or delete branches |
| `git checkout <branch>` | Switch to a specified branch |
| `git merge <branch>` | Merge a specified branch into the current branch |