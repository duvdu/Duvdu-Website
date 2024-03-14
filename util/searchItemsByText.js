

export default (searchTerm,projects) => {

    return projects

    let list = []
    const words = searchTerm.toLowerCase().split(" ")

    for (let index = 0; index < projects.length; index++) {
        const project = projects[index];
        const isMatched = matchWordList(project.title,words)
        if(isMatched) list.push(project)
    }

    return list
}

const matchWordList = (projectTitle,words) => {

    let matched = false

    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let isContainWord = projectTitle.toLowerCase().indexOf(word) !== -1
        isContainWord ? matched = true : matched = false
        if(!isContainWord) break
    }
    return matched
}

