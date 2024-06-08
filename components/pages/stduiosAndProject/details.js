import { convertHoursTo__ } from "../../../util/util";
import GoogleMap from "../../elements/googleMap";
import dateFormat from "dateformat";

const Details = ({ data }) => (
    <div className="grad-card bg-gradient-to-b from-[#D5D5D5] dark:from-[#1A2024] to-transparent w-full border-50 p-6">
        <div className="w-full flex justify-center my-10">
            <span className="text-center capitalize opacity-50">{dateFormat(data?.date, 'mmmm d - yyyy')}</span>
        </div>

        <div className="flex flex-col gap-2">

            {data?.tools?.map(tool => [
                { value: tool.name, isActive: false },
                { value: tool.fees, isActive: false }
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

        <div className="mt-9">
            <span className="capitalize opacity-50">description</span>
        </div>
        <span className="capitalize font-semibold mt-4">{data?.desc}</span>
        <div className="mt-9">
        </div>
        {
            data?.location &&
            <section>
                <span className="capitalize opacity-50">location</span>
                <div className="capitalize mt-4">
                    <section className="h-52 relative rounded-3xl overflow-hidden">
                        <GoogleMap width={'100%'} value={{ 'lat': data.location.lat, 'lng': data.location.lng }} />
                    </section>
                </div>
            </section>
        }
        <section className="hidden">
            <div className="mt-9">
                <span className="capitalize opacity-50">shooting time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data?.shooting_time)}</span>
            </div>
        </section>
        <section className="hidden">

            <div className="mt-9">
                <span className="capitalize opacity-50">delivery time</span>
            </div>
            <div>
                <span className="capitalize font-semibold">{convertHoursTo__(data?.delivery_time)}</span>
            </div>
        </section>
    </div>
)

export default Details
