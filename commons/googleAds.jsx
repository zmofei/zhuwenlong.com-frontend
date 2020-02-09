import React, { useEffect } from "react";

function Adsense(props) {

  // useEffect(() => {
  //   // if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  function render() {
    return (
      <>
        <ins className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-0645475852185063"
          data-ad-slot="5520937769" />
      </>
    )
  }

  return render();
}

export default Adsense;