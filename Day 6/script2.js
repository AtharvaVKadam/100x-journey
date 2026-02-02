function updateDomAccToState(state) {
        const parent = document.getElementById("todos");
        parent.innerHTML = ""; 
        
        for (let i = 0; i < state.length; i++) {

            const child = createChild(state[i].title, state[i].description, state[i].id);
            parent.appendChild(child);
        }
    }

    window.setInterval(function() {

        const randomId = Math.floor(Math.random() * 100);
        
        const newState = [
            {
                id: randomId,
                title: "Generated Todo " + randomId,
                description: "This appeared automatically"
            },
            {
                id: randomId + 1,
                title: "Another Todo",
                description: "I am also from the state"
            }
        ];

        updateDomAccToState(newState);
    }, 5000);