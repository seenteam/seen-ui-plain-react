import PulseLoader from 'react-spinners/PulseLoader'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/react";
import './Loading.css'

const Loading = ({loading, type}) => {

  const override = css`
    display: block;
    margin: 0 auto;
    color: red;
  `;

  return <section className="loading-container">
    {!type ? <FadeLoader loading={loading} color="salmon" size={3}/> : <PulseLoader color="salmon" loading={loading} size={5} css={override} />}
  </section>
}

export default Loading
