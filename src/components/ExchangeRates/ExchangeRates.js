import { useQuery} from "@apollo/client";
import { GET_ALL_USERS } from '../../queries/queries';

const ExchangeRates = () => {
   const { loading, error, data } = useQuery(GET_ALL_USERS);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

   return data.users.map(({ firstName, lastName }) => (
     <div key={firstName}>
       <p>
         {firstName} {lastName}
       </p>
     </div>
   ));
 };

export default ExchangeRates;
  