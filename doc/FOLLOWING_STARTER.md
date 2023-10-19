# Following Along With `egg-starter`

When you start a new project with egg-starter, you have two choices:

1. EASY: Use the template option in github. Follow the prompts
2. HARDER: Do multiple remotes, so you can `git pull` in future changes to the egg

Which should you do, the easy or harder way?

The easy way will not allow you to pull changes from the original repo. The harder does.

Me? I'm likely to do it the easy way and just take my chances. 

## How To Set Up Mulitple Git Remotes:

Here is the harder way. First, the plain english version, no code:

- `git clone` egg-starter, only into a folder using named for your new project
- Do some commands to set egg starter as pull only, no push
- Set up your new project from github, with no code
- Do some commands to set up your cloned egg-starter as the new github project
- Use a different than normal git pull command to update from egg-starter

Now, the same thing, only in commands, where `foo-project` is the name of your project

- `git clone git@github.com:VictoryCTO/egg-starter.git foo-project` this creates a folder `foo-project`
- cd into `foo-project`
- `git remote rename origin upstream`
- `git remote set-url --push upstream no_push`
- Now, go create foo-project on github, only without any code.
- It will give you these next two lines to run. Do them both:
- `git remote add origin git@github.com:VictoryCTO/foo-project.git`
- `git push -u origin master`

You should now be setup to pull from either repo:

- use normal `git pull` from your `foo-project`
- use `git pull upstream master` to pull the master branch of egg-starter

Warning! All the normal precautions apply - if you have changed a file in both repos, you will have to manually merge that file. This is no different than any other merge conflict.

What if I run into other problems? You might start with this, below:

## Here is the reference, for how I obtained the above:

Tip: You might try running `git remote -v` on foo-project to verify that it looks the way you would expect:

```bash
$ git remote -v
origin	git@github.com:VictoryCTO/foo-project.git (fetch)
origin	git@github.com:VictoryCTO/foo-project.git (push)
upstream	git@github.com:VictoryCTO/egg-starter.git (fetch)
upstream	no_push (push)
```

Elsewise this might have some tips, especially if any of these notes were transcribed wrong.

https://medium.com/@smrgrace/having-a-git-repo-that-is-a-template-for-new-projects-148079b7f178

This markdown doc was created by Pete, and the process was tested once, to make sure it worked.
