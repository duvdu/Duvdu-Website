import Link from "next/link";
import { isVideo } from "../../../util/util";
import React, { useState, useEffect } from "react";
import ProjectItem from "./projectItem";
import SmallProjectItem from "./smallProjectItem";

function SectionProjects({ projects }) {
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        handleResize()
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function isInSequence(i) {
        let current, stepSmall, stepLarge;

        if (windowWidth < 959) {
            current = 2;
            stepSmall = 3;
            stepLarge = 0;
        } else if (windowWidth <= 1267) {
            current = 4;
            stepSmall = 5;
            stepLarge = 7;
        } else {
            current = 6;
            stepSmall = 7;
            stepLarge = 11;
        }

        let addLarge = true;

        while (current <= i) {
            if (current === i) return true;
            current += addLarge ? stepSmall : stepLarge;
            addLarge = !addLarge;
        }

        return false;
    }
    // const repeatedProjects = Array(90).fill(projects).flat();
    const repeatedProjects = projects
    return projects?.length > 0 && (
        <div>
            <div className="sm:hidden grid minmax-150 gap-3">
                {repeatedProjects?.map((item, i) => (
                    item &&
                    <SmallProjectItem key={i} cardData={item} className={i % 3 === 0 ? 'col-span-2 row-span-2' : ''} isbig={i % 3 === 0} />
                ))}
            </div>
            <div className="hidden sm:grid minmax-280 gap-4">
                {repeatedProjects?.map((item, i) => (
                    item &&
                    <ProjectItem key={i} cardData={item} className={isInSequence(i) ? 'col-span-2 row-span-2' : ''} />
                ))}
            </div> 
            {/* <video controls width="500" height="500">
                <source src="/assets/imgs/video/1.mp4" />
            </video>
            <video controls width="500" height="500">
                <source src="/assets/imgs/video/2.MOV" />
            </video>
            <video controls width="500" height="500">
                <source src="/assets/imgs/video/3.MOV" />
            </video>
            <video controls width="500" height="500">
                <source src="/assets/imgs/video/4.MOV" />
            </video>
            <video controls width="500" height="500">
                <source src="/assets/imgs/video/5.MOV" />
            </video> */}
        </div>
    );
}

export default SectionProjects;
