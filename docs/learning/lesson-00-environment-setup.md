# Lesson 0 — Environment Setup on Windows and Ubuntu

## Purpose

This is the first lesson of the course.

Assume the learner has a clean computer with no development environment configured.

The learner should finish this lesson with:

- Git installed
- Python installed
- a terminal they can use
- the repository cloned locally
- a Python virtual environment created
- project dependencies installed
- tests running
- the FastAPI application running
- the web course open in a browser
- a basic understanding of every command used

No command should be presented without explaining:

1. why it is needed
2. what program executes it
3. what every important argument means
4. what change it makes to the computer or project
5. what successful output should look like
6. what common error may occur

---

# Part A — Choose your operating system

Use one of these paths:

- **Windows 10/11 with PowerShell**
- **Ubuntu Linux with Bash**

The source code is the same on both systems. The main differences are installation commands, paths, and virtual-environment activation.

---

# Part B — Windows 10/11 setup

## 1. Install Git

Download and install Git for Windows from the official Git website.

During installation, the default choices are suitable for this course.

### Why Git is needed

Git records source-code history and downloads the project from GitHub.

### Verify Git

Open **PowerShell** and run:

```powershell
git --version
```

Explanation:

- `git` starts the Git command-line program.
- `--version` asks Git to print its installed version and exit.

Expected output resembles:

```text
git version 2.x.x.windows.x
```

If PowerShell says that `git` is not recognized, close and reopen PowerShell. If the problem remains, Git was not added to the Windows PATH during installation.

## 2. Install Python

Install a current supported Python 3 release from the official Python website or through Windows Package Manager.

Using `winget`:

```powershell
winget install Python.Python.3.12
```

Explanation:

- `winget` is the Windows Package Manager.
- `install` tells it to install a package.
- `Python.Python.3.12` is the package identifier for Python 3.12.

During a manual installer setup, enable **Add Python to PATH**.

### Verify Python

```powershell
py --version
```

Explanation:

- `py` starts the Windows Python Launcher.
- `--version` prints the selected Python version.

Expected output resembles:

```text
Python 3.12.x
```

Also verify `pip`:

```powershell
py -m pip --version
```

Explanation:

- `py` starts Python.
- `-m pip` runs the installed `pip` module as a program.
- `--version` prints the package manager version and location.

`pip` installs Python packages, similar in purpose to NuGet for .NET projects.

## 3. Create a folder for source-code projects

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\code"
Set-Location "$HOME\code"
```

Explanation:

- `New-Item` creates a new filesystem item.
- `-ItemType Directory` specifies that the item is a folder.
- `-Force` avoids an error if the folder already exists.
- `-Path "$HOME\code"` creates a `code` folder inside the current user's home folder.
- `Set-Location` changes the current PowerShell folder. It is the PowerShell equivalent of `cd`.
- `$HOME` is the current user's home directory.

Verify the current location:

```powershell
Get-Location
```

## 4. Clone the repository

```powershell
git clone https://github.com/dimitriskl/agentic-operations-platform.git
Set-Location agentic-operations-platform
```

Explanation:

- `git clone` downloads the repository and creates a local Git working copy.
- The URL identifies the GitHub repository.
- `Set-Location agentic-operations-platform` enters the newly created project folder.

Verify:

```powershell
git status
```

Expected result includes:

```text
On branch main
```

## 5. Create a Python virtual environment

```powershell
py -m venv .venv
```

Explanation:

- `py` starts Python.
- `-m venv` runs Python's built-in virtual-environment module.
- `.venv` is the directory where the isolated environment will be created.

A virtual environment keeps this project's Python interpreter and packages separate from other projects.

This is conceptually similar to giving one solution its own isolated package environment.

## 6. Activate the virtual environment

```powershell
.\.venv\Scripts\Activate.ps1
```

Explanation:

- `.\` means “from the current directory.”
- `.venv\Scripts\Activate.ps1` is the PowerShell activation script created by `venv`.
- Activation changes the current shell so `python` and `pip` point to this project's environment.

After activation, the prompt usually starts with:

```text
(.venv)
```

### PowerShell execution-policy error

If PowerShell blocks the activation script, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Explanation:

- `Set-ExecutionPolicy` changes PowerShell script-execution rules.
- `-Scope Process` limits the change to the current PowerShell process only.
- `-ExecutionPolicy Bypass` allows the activation script for this session.
- Closing PowerShell removes this temporary policy change.

## 7. Upgrade pip

```powershell
python -m pip install --upgrade pip
```

Explanation:

- `python` uses the activated virtual environment.
- `-m pip` runs pip through that exact Python interpreter.
- `install` installs a package.
- `--upgrade` replaces an older version if one exists.
- `pip` is the package being upgraded.

## 8. Install project dependencies

```powershell
python -m pip install -r requirements.txt
```

Explanation:

- `python -m pip` ensures the active environment receives the packages.
- `install` installs dependencies.
- `-r` means “read package requirements from a file.”
- `requirements.txt` lists the packages needed by the project.

## 9. Run the tests

```powershell
python -m pytest
```

Explanation:

- `python -m pytest` runs pytest with the active Python interpreter.
- Tests verify that existing project behavior still works.

Expected output should report passed tests and no failures.

## 10. Start the FastAPI application

```powershell
python -m fastapi dev src/main.py
```

Explanation:

- `python -m fastapi` runs the FastAPI command-line module using the active environment.
- `dev` starts the development server with automatic reload after code changes.
- `src/main.py` is the application entry file.

Keep this PowerShell window open while the server runs.

Open in the browser:

```text
http://127.0.0.1:8000/course
```

Explanation:

- `127.0.0.1` means this computer only, also called localhost.
- `8000` is the TCP port used by the development server.
- `/course` is the route for the interactive course.

Stop the server with:

```text
Ctrl+C
```

## 11. Continue work on a later day

```powershell
Set-Location "$HOME\code\agentic-operations-platform"
.\.venv\Scripts\Activate.ps1
git pull
python -m pytest
python -m fastapi dev src/main.py
```

`git pull` downloads and integrates new commits from the configured remote repository into the current branch.

---

# Part C — Ubuntu setup

## 1. Update the package index

```bash
sudo apt update
```

Explanation:

- `sudo` runs the following command with administrator privileges.
- `apt` is Ubuntu's package manager.
- `update` downloads the latest package metadata. It does not upgrade installed applications.

## 2. Install Git, Python, venv, and pip

```bash
sudo apt install -y git python3 python3-venv python3-pip
```

Explanation:

- `apt install` installs software packages.
- `-y` automatically answers yes to the confirmation prompt.
- `git` provides source-control commands.
- `python3` installs the Python interpreter.
- `python3-venv` provides virtual-environment support.
- `python3-pip` provides Python package installation support.

## 3. Verify installations

```bash
git --version
python3 --version
python3 -m pip --version
```

Each command prints the installed tool version.

## 4. Create a project folder

```bash
mkdir -p ~/code
cd ~/code
```

Explanation:

- `mkdir` creates a directory.
- `-p` creates missing parent directories and avoids an error if the folder exists.
- `~` represents the current user's home directory.
- `cd` changes the current directory.

Verify:

```bash
pwd
```

`pwd` prints the full path of the current directory.

## 5. Clone the repository

```bash
git clone https://github.com/dimitriskl/agentic-operations-platform.git
cd agentic-operations-platform
```

`git clone` downloads the repository and creates a local working copy.

Verify:

```bash
git status
```

## 6. Create a virtual environment

```bash
python3 -m venv .venv
```

Explanation:

- `python3` starts Python 3.
- `-m venv` runs the built-in virtual-environment module.
- `.venv` is the environment directory.

## 7. Activate the virtual environment

```bash
source .venv/bin/activate
```

Explanation:

- `source` executes a script inside the current shell rather than a child process.
- `.venv/bin/activate` adjusts `PATH` so `python` and `pip` refer to this project environment.

The terminal prompt should usually begin with `(.venv)`.

## 8. Upgrade pip and install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Using `python -m pip` guarantees that pip belongs to the currently activated interpreter.

## 9. Run tests

```bash
python -m pytest
```

Pytest discovers and runs the project's automated tests.

## 10. Start the application

```bash
python -m fastapi dev src/main.py
```

Open:

```text
http://127.0.0.1:8000/course
```

Stop the server with `Ctrl+C`.

## 11. Continue on a later day

```bash
cd ~/code/agentic-operations-platform
source .venv/bin/activate
git pull
python -m pytest
python -m fastapi dev src/main.py
```

---

# Part D — Understanding terminal syntax

## Command

The first word is normally the program being executed:

```text
git
python
pytest
sudo
```

## Subcommand

Some programs use a second word to select an operation:

```text
git clone
pip install
apt update
```

## Option or flag

Options modify behavior and usually begin with `-` or `--`:

```text
--version
--upgrade
-r
-y
```

## Argument

Arguments identify the target of an operation:

```text
requirements.txt
src/main.py
https://github.com/...
```

## Path differences

Windows commonly uses backslashes:

```text
.\.venv\Scripts\Activate.ps1
```

Ubuntu uses forward slashes:

```text
.venv/bin/activate
```

---

# Part E — Completion checklist

The learner has completed Lesson 0 when all items are true:

- [ ] Git prints a version.
- [ ] Python prints a version.
- [ ] The repository exists locally.
- [ ] `git status` works inside the repository.
- [ ] `.venv` exists.
- [ ] The virtual environment activates.
- [ ] Dependencies install without errors.
- [ ] `python -m pytest` passes.
- [ ] The FastAPI server starts.
- [ ] `http://127.0.0.1:8000/course` opens.
- [ ] The learner can explain what `git clone`, `venv`, `pip install -r`, `pytest`, and `fastapi dev` do.

---

# Course-wide command explanation standard

Every later lesson must follow this format whenever it introduces a terminal command:

```text
Command
Why we need it
What each part means
What it changes
Expected success output
Common error and recovery
```

Never assume the learner already knows:

- which terminal to open
- which directory they are in
- whether the virtual environment is active
- whether a command is Windows-specific or Ubuntu-specific
- whether a command changes the system, repository, or only the current terminal session
