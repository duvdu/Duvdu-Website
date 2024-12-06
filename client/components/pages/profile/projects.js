import Link from "next/link";
import { isVideo } from '../../../util/util';
import React from 'react'
import ProjectItemHome from "../home/ProjectItemHome";
function getCycle(ref) {
    switch (ref) {
        case "rentals":
        case "studio-booking":
            return "rentals";
        default:
            return "project";
    }
}


function Projects({ projects }) {

    return projects?.length > 0 && (
        <div className='container sm:p-0 project-grid gap-[10px]'>
            {projects.map((data, index) => (
                // <Project key={index} data={data} isbig={(index + 1) % 4 < 2} />
                <ProjectItemHome key={data._id} type={getCycle(data?.ref)} cardData={data} isbig={(index + 1) % 4 < 2}/>
            ))}
        </div>
    )
}

export default Projects