import React from "react";

const Preloader = () => {
    return (
        <>
           <div id="preloader-active">
			<div className="preloader flex items-center justify-center">
				<div className="preloader-inner relative">
					<div className="text-center">
						<img className="loading-img" src="/assets/imgs/theme/loading.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
        </>
    );
};

export default Preloader;
