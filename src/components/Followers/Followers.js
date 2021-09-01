import { useQuery, useMutation } from "@apollo/client";
import * as gql from '../../queries/queries'

const Followers = ({id}) => {

  const { loading, error, data } = useQuery(gql.GET_FOLLOWING_INFO(id))
  const [createFollower] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(id) }],
  });

  const check = () => {
    if (data) console.log(data)
  }

  const addFriend = (e) => {
    let idToAdd = 4
    if (idToAdd === id) return e.target.innerText = 'Cant add yourself!'
    e.target.setAttribute('disabled', true)
    createFollower({
      variables: {
        'userId': 2,
        'friendId': id
      },
    })
  }

  return (
    <div>
      {!!data && check()}
      {<button onClick={e => addFriend(e)}>Add friend 2</button>}
    </div>
  )
}

export default Followers
