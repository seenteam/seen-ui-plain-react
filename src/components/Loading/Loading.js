import PulseLoader from 'react-spinners/PulseLoader'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/react";

const Loading = ({loading, type}) => {

  const override = css`
    display: block;
    margin: 0 auto;
    color: red;
  `;

  return (!type)
  ? <FadeLoader loading={loading} color="cyan"/>
  : <PulseLoader color="cyan" loading={loading} size={10} css={override} />
}

export default Loading
