# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="bira"

# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
alias apt-get="sudo apt-get "
alias dpkg="sudo dpkg "
alias shutdown="sudo shutdown"
alias npm="sudo npm "g
alias cls="clear"
alias open='xdg-open &>/dev/null'
alias cat='pygmentize -g '
alias cat_org='cat '

# to make alert helper work
alias alert_helper='history|tail -n1|sed -e "s/^\s*[0-9]\+\s*//" -e "s/;\s*alert$//"'
alias alert='notify-send -i /usr/share/icons/gnome/32x32/apps/gnome-terminal.png "[$?] $(alert_helper)"'

# Set to this to use case-sensitive completion
# CASE_SENSITIVE="true"

# Uncomment this to disable bi-weekly auto-update checks
# DISABLE_AUTO_UPDATE="true"

# Uncomment to change how often before auto-updates occur? (in days)
# export UPDATE_ZSH_DAYS=13
export PATH=$PATH:"/SDK/jdk/bin"
export JAVA_HOME="/SDK/jdk"
export IDEA_JDK="/SDK/jdk"
export JDK_HOME="/SDK/jdk"


# Uncomment following line if you want to disable colors in ls
# DISABLE_LS_COLORS="true"

# Uncomment following line if you want to disable autosetting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment following line if you want to disable command autocorrection
# DISABLE_CORRECTION="true"

# Uncomment following line if you want red dots to be displayed while waiting for completion
# COMPLETION_WAITING_DOTS="true"

# Uncomment following line if you want to disable marking untracked files under
# VCS as dirty. This makes repository status check for large repositories much,
# much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git rails bower command-not-found coffee dircycle fasd gem gradle mvn node per-directory-history pip ruby rvm wd)
# plugins=(git rails bower coffee dircycle per-directory-history node fasd gem gradle wd node )

source $ZSH/oh-my-zsh.sh

# Customize to your needs...
function cd(){
    builtin cd "$@" && ls -F
}
zstyle ':completion:*:processes-names' command 'ps -e -o comm='
zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;32'alias yo='yeoman'
alias cpd=compound

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
alias cpd=compound
