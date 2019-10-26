dev:
	tmux split-window
	tmux send-keys -t {down-of} 'tsc --watch' C-m
	tmux new-window
	tmux send-keys 'cd public && server' C-m
	tmux split-window
	tmux send-keys 'watch-files --rewrite-js' C-m
	tmux select-window -t 1
	tmux send-keys 'vi' C-m
