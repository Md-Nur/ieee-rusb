import ShowContents from "../ShowContents"
import Title from "../Title"

const RecentEvents = () => {
  return (
    <div className="w-full">
        <Title>Recent Events</Title>
        <ShowContents query="recent-events" />
    </div>
  )
}

export default RecentEvents