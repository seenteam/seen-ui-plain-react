import { useQuery } from "@apollo/client";
import Loading from '../Loading/Loading.js'
import TopFluxUserCard from './TopFluxUserCard/TopFluxUserCard'
import * as gql from '../../queries/queries'
import './TopFlux.css'

const TopFlux = () => {

  const topFlux = useQuery(gql.GET_TOP_FLUX)

  if (topFlux.loading) return <Loading loading={topFlux.loading} />

  const renderTop = () => {
    if (topFlux.data) {
      console.log('SHOULD HAVE DATA HERE', topFlux.data)
      return topFlux.data.topFlux.map(user => <TopFluxUserCard data={user} />)
    }
  }

  return (
    <section className="top-container">
      {renderTop()}
    </section>
  )
}

export default TopFlux
