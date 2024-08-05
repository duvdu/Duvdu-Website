import { convertHoursTo__ } from "../../../util/util";
import GoogleMap from "../../elements/googleMap";
import dateFormat from "dateformat";

const Details = ({ data }) => {
console.log(data)

    return (
        <div className="grad-card bg-gradient-to-b from-[#D5D5D5] dark:from-[#1A2024] to-transparent border-50 p-6 mx-5">
            <div className="w-full flex justify-center my-10">
                <span className="text-center capitalize opacity-50">{dateFormat(data?.createAt, 'mmmm d - yyyy')}</span>
            </div>

            {(data?.tools || data?.equipments)?.length > 0 &&
                <>
                    <div className="mt-9 mb-3">
                        <h3 className="capitalize opacity-50"> Tools Used </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {(data?.tools || data?.equipments).map(tool => [
                            { value: tool.name, isActive: false },
                            { value: tool.unitPrice, isActive: false }
                        ]).map((toolGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {toolGroup.map((tool, j) => (
                                    <div key={j} className={`text-white rounded-3xl py-2 px-4 ${tool.isActive ? 'bg-primary' : 'bg-[#00000040]'}`}>
                                        {tool.value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }

            {data?.functions?.length > 0 &&
                <>
                    <div className="mt-4 mb-3">
                        <h3 className="capitalize opacity-50"> function Used </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {(data?.functions).map(tool => [
                            { value: tool.name, isActive: false },
                            { value: tool.unitPrice, isActive: false }
                        ]).map((toolGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {toolGroup.map((tool, j) => (
                                    <div key={j} className={`text-white rounded-3xl py-2 px-4 ${tool.isActive ? 'bg-primary' : 'bg-[#00000040]'}`}>
                                        {tool.value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }
            {data?.creatives?.length > 0 &&
                <>
                    <div className="mt-4 mb-3">
                        <h3 className="capitalize opacity-50"> creatives </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {data?.creatives.map(creative => [
                            { value: creative?.name, isActive: false, img: creative?.creative?.profileImage },
                            { value: "", isActive: false },
                            { value: 'CATEGOREY', isActive: false },
                        ]).map((creativeGroup, i) => (
                            <div key={i} className="flex gap-2">
                                {creativeGroup.map((creative, j) => (
                                    <div key={j} className={`flex rounded-3xl ${creative.isActive ? 'bg-primary' : 'bg-[#00000040]'}`}>
                                        {creative.img ?
                                            <img className="h-10 aspect-square rounded-full object-cover object-top" src={creative.img} alt="profile" /> :
                                            <div className="h-10" />
                                        }
                                        {
                                            creative.value &&
                                            <span className="px-4 flex items-center text-white">
                                                {creative.value}
                                            </span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            }

            <div className="mt-9">
                <h3 className="capitalize opacity-50">description</h3>
            </div>
            <span className="capitalize font-semibold mt-4">{data?.desc || data?.description}</span>
            <div className="mt-9">
            </div>
            {
                data?.location &&
                <section>
                    <span className="capitalize opacity-50">location</span>
                    <div className="capitalize">
                        <section >
                            <GoogleMap
                                width={'100%'} value={{ 'lat': data.location.lat, 'lng': data.location.lng }}
                                isreadOnly={true}
                                className={"relative rounded-3xl overflow-hidden h-[200px] border-2 border-primary"}
                                height={200}
                                inputclass={"my-0 bg-transparent font-bold"}
                                fullscreenControl={false}
                            />
                        </section>
                    </div>
                </section>
            }
            
            {
                data.duration &&
                <section>
                <div className="mt-9">
                    <span className="capitalize opacity-50">duration</span>
                </div>
                <div>
                    <span className="capitalize font-semibold">{data.duration} Days</span>
                </div>
            </section>}
{data.insurance &&
            <section>
                <div className="mt-9">
                    <span className="capitalize opacity-50">insurance</span>
                </div>
                <div>
                    <span className="capitalize font-semibold">{data.insurance}</span>
                </div>
            </section>
            }
        </div>
    )
}

export default Details
