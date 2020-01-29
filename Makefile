dev:
	tmux split-window
	tmux send-keys -t {down-of} 'yarn run webpack --watch' C-m
	tmux new-window
	tmux send-keys 'cd public && server' C-m
	tmux select-window -t 1
