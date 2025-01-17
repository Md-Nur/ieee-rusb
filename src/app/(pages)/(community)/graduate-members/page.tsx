import ShowUsers from "@/components/ShowUsers"
import Title from "@/components/Title"

const graduateMembers = () => {
  return (
    <div className="w-full">
    <Title>Graduate Members</Title>
    <ShowUsers query="gradaute-member" />
  </div>
  )
}

export default graduateMembers