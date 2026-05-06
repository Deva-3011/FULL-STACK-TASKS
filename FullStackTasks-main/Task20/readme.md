# Git Branching Strategy – Feature Branch, Merge, Rebase & Conflict Resolution

## 📌 Project Overview

This project demonstrates Git branching strategies including feature branches, merging, rebasing, and resolving merge conflicts.

---

## 📁 Project Structure

```
sample-branch-project/
│── src/
│   └── Main.java
│── .gitignore
│── README.md
```

---

## 🔧 Git Branching Process

### Initialize Repository

```
git init
```

### Create and Switch to Main Branch

```
git checkout -b main
```

### Add Initial File and Commit

```
git add .
git commit -m "Initial commit"
```

---

## 🌿 Create Feature Branch

```
git checkout -b feature/login
```

### Make Changes and Commit

```
git add .
git commit -m "Added login feature"
```

---

## 🔀 Merge Feature Branch into Main

```
git checkout main
git merge feature/login
```

---

## 🔁 Rebase Feature Branch

```
git checkout feature/login
git rebase main
```

---

## ⚠️ Create Merge Conflict

### Step 1: Modify Same File in Main

```
git checkout main
# edit Main.java
git add .
git commit -m "Updated main branch code"
```

### Step 2: Modify Same File in Feature Branch

```
git checkout feature/login
# edit Main.java (same lines)
git add .
git commit -m "Updated feature branch code"
```

### Step 3: Merge to Trigger Conflict

```
git checkout main
git merge feature/login
```

---

## 🛠️ Resolve Merge Conflict

### Open Conflicted File (Example)

```
<<<<<<< HEAD
System.out.println("Main branch code");
=======
System.out.println("Feature branch code");
>>>>>>> feature/login
```

### Edit and Resolve

```
System.out.println("Merged code from main and feature");
```

### Mark as Resolved

```
git add .
git commit -m "Resolved merge conflict"
```

---

## 🔁 Continue Rebase (if conflict during rebase)

```
git rebase --continue
```

---

## 📜 View Branches

```
git branch
```

---

## 📜 View Commit History

```
git log --oneline --graph --all
```

---

## 🔄 Workflow Summary

```
Create Branch → Work on Feature → Commit → Merge/Rebase → Resolve Conflicts → Final Commit
```

---

## 🧪 Sample Output

```
Merged code from main and feature
```
