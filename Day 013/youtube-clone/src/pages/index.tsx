import { VideoCard } from "../components/VideoCard";

const VIDEOS = [
  {
    id: 1,
    title: "Jilian Macclayer - A Day in the Life of a Software Engineer",
    thumbnail: "https://i.ytimg.com/vi/K4TOrB7at0Y/hqdefault.jpg", 
    duration: "12:45",
    channelName: "Jilian Macclayer",
    channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_k7r-w9k2L9C_6o8y-E7r3j3i5l0l4h-j4k=s176-c-k-c0x00ffffff-no-rj", 
    views: "1.4M views",
    uploadedAt: "1 year ago"
  },
  {
    id: 2,
    title: "CodeWithHarry - React Tutorial for Beginners", 
    thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/hqdefault.jpg", 
    duration: "15:20",
    channelName: "CodeWithHarry",
    channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_nO3F7D_4Wf5F_6G_8H8I9J0K_L_M_N_O_P=s176-c-k-c0x00ffffff-no-rj", 
    views: "500K views",
    uploadedAt: "2 months ago"
  },
  {
    id: 3,
    title: "Fireship - 100 Seconds of Code",
    thumbnail: "gw-YX7XOPmI-HD.jpg", 
    duration: "2:10",
    channelName: "Fireship",
    channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj", 
    views: "2M views",
    uploadedAt: "3 days ago"
  },
  {
     id: 4,
     title: "Harkirat Singh - 100xDevs Launch Event",
     thumbnail: "gw-YX7XOPmI-HD.jpg",
     duration: "45:00",
     channelName: "Harkirat Singh",
     channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj",
     views: "100K views",
     uploadedAt: "1 month ago"
  },
  {
     id: 4,
     title: "Harkirat Singh - 100xDevs Launch Event",
     thumbnail: "gw-YX7XOPmI-HD.jpg",
     duration: "45:00",
     channelName: "Harkirat Singh",
     channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj",
     views: "100K views",
     uploadedAt: "1 month ago"
  },
  {
     id: 4,
     title: "Harkirat Singh - 100xDevs Launch Event",
     thumbnail: "gw-YX7XOPmI-HD.jpg",
     duration: "45:00",
     channelName: "Harkirat Singh",
     channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj",
     views: "100K views",
     uploadedAt: "1 month ago"
  },
  {
     id: 4,
     title: "Harkirat Singh - 100xDevs Launch Event",
     thumbnail: "gw-YX7XOPmI-HD.jpg",
     duration: "45:00",
     channelName: "Harkirat Singh",
     channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj",
     views: "100K views",
     uploadedAt: "1 month ago"
  },
  {
     id: 4,
     title: "Harkirat Singh - 100xDevs Launch Event",
     thumbnail: "gw-YX7XOPmI-HD.jpg",
     duration: "45:00",
     channelName: "Harkirat Singh",
     channelAvatar: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s160-c-k-c0x00ffffff-no-rj",
     views: "100K views",
     uploadedAt: "1 month ago"
  }
];

function App() {
  return (
    <div className="bg-black min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEOS.map((video) => (
          <VideoCard 
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            channelName={video.channelName}
            channelAvatar={video.channelAvatar}
            views={video.views}
            uploadedAt={video.uploadedAt}
          />
        ))}
      </div>
    </div>
  );
}

export default App;