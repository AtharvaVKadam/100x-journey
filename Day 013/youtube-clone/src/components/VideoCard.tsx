export function VideoCard(props: any) {
  return (
    <div className="p-3 cursor-pointer">
      <div className="relative">
        <img 
          src={props.thumbnail} 
          className="rounded-xl w-full aspect-video object-cover" 
          alt="thumbnail"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {props.duration}
        </div>
      </div>
      <div className="grid grid-cols-12 pt-3"> 
        <div className="col-span-1">
          <img 
            className="rounded-full w-10 h-10 object-cover" 
            src={props.channelAvatar} 
            alt="avatar"
          />
        </div>
        <div className="col-span-11 pl-2">
          <div className="text-white text-base font-semibold line-clamp-2">
            {props.title}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            {props.channelName}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {props.views} • {props.uploadedAt}
          </div>
        </div>
      </div>
    </div>
  );
}