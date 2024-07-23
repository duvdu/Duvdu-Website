import Link from "next/link";
import { isVideo } from "../../../util/util";
import React from "react";
import ProjectItem from "./projectItem";

function isInSequence(i) {
    let current = 6;
    let add7 = true;
    
    while (current <= i) {
        if (current === i) {
            return true;
        }
        if (add7) {
            current += 7;
        } else {
            current += 11;
        }
        add7 = !add7;
    }
    
    return false;
}

function SectionProjects({ projects }) {
    return projects?.length > 0 && (
        <div className='container'>
            <div className="grid minmax-280 gap-5">
                {projects?.map((item, i) => (
                    <React.Fragment key={item.id || i}>
                        {i === -1 && <RelatedCategories NeedTranslate={false} className="block lg:hidden xl:hidden col-span-full" />}
                        {i === -1 && <RelatedCategories className="hidden lg:block xl:hidden col-span-full" />}
                        {i === -1 && <RelatedCategories className="hidden xl:block col-span-full" />}
                        {/* ProjectCard */}
                        <ProjectItem cardData={item} className={isInSequence(i) ? 'col-span-2 row-span-2 ' : ''} >
                            {i}
                        </ProjectItem>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}




export default SectionProjects;
