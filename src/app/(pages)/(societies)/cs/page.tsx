import ShowUsers from "@/components/ShowUsers"
import Title from "@/components/Title"

const CS = () => {
  return (
    <div className="w-full">
      <Title>IEEE Computer Society RUSBC</Title>
      <ShowUsers query="computer-society" />
    </div>
  )
}

export default CS