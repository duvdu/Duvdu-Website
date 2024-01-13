// Filter projects By Filters

export default (projectList, filters) => {
    let filteredList = [...projectList];

    for (const key in filters) {
        if (key !== "price") {
            if (
                filters[key] === "featured" ||
                filters[key] === "trending" ||
                filters[key] === "lowToHigh" ||
                filters[key] === "highToLow"
            ) {
                if (filters[key] === "lowToHigh") {
                    filteredList = [
                        ...filteredList.sort((a, b) => {
                            if (a.price < b.price) return -1;
                            if (a.price > b.price) return 1;
                        }),
                    ];
                } else {
                    if (filters[key] === "highToLow") {
                        console.log("hi");
                        filteredList = [
                            ...filteredList.sort((a, b) => {
                                if (b.price < a.price) return -1;
                                if (b.price > a.price) return 1;
                            }),
                        ];
                    } else {
                        console.log("hi1");
                        filteredList = filteredList.filter(
                            (item) => item[filters[key]]
                        );
                    }
                }
            } else {
                filteredList = filterByKey(filteredList, filters[key], key);
            }
        } else {
            filteredList = filterByPrice(filteredList, filters[key], key);
        }
    }
    return filteredList;
};

// Filter project By Price

function filterByPrice(filteredList, price, key) {
    let list = [];

    for (let index = 0; index < filteredList.length; index++) {
        const project = filteredList[index];
        const projectPrice = project[key];

        if (projectPrice >= price.min && projectPrice <= price.max) {
            list.push(project);
        }
    }

    return (filteredList = list);
}

// Filter project by key size/category/brand etc

function filterByKey(filteredList, size, key) {
    let list = [];
    if (!size || size.length === 0) return filteredList;
    for (let index = 0; index < filteredList.length; index++) {
        const project = filteredList[index];

        if (size.indexOf != undefined) {
            const isOk = size && size.indexOf(project[key]);
            if (isOk !== -1) {
                list.push(project);
            }
        }
    }

    return (filteredList = list);
}
