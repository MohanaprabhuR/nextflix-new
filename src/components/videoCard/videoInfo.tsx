import _ from "lodash";

const videoInfo = ({ info }) => {
  return (
    <div className="pt-6">
      <h2 className="text-black text-base font-[430] leading-[100%] tracking-[0.4px]">
        {info.name}
      </h2>
      <p className="text-[#8B8787] text-sm font-[410] leading-[150%] tracking-[0.35px] pt-2 pb-3">
        {_.truncate(info.description, {
          length: 80,
          separator: " ",
          omission: "...",
        })}
      </p>
      <p className="text-[#8B8787] text-[13px] font-normal leading-[100%] tracking-[0.13px]">
        {info.original_air_date}
      </p>
    </div>
  );
};

export default videoInfo;
