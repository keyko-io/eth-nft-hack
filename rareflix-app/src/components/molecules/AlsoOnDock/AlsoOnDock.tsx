import React, { useEffect, useState } from "react";
import { useDocker } from "../../../context/DockProvider";
import styles from "./AlsoOnDock.module.scss";
import Emoji from "../../atoms/Emoji";
import DockButton from "../../atoms/DockButton";
import AlsoOnCard from "../AlsoOnCard/AlsoOnCard";
import {
  cryptoVoxelsImage,
  cryptoVoxelsGenericUrl,
  openSeaImage,
  openSeaUrl,
  rareEffectImage,
  rareEffectGenericUrl,
} from "../../atoms/ImageUrls";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { useNvm } from "../../../context/NvmProvider";
import { useSlider } from "../../../context/SliderProvider";
import { nftLocationData } from "../../../data/NftLocationData";
import MetaCard from "../MetaCard/MetaCard";

const AlsoOnDock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currentIndex } = useSlider();
  const { DDOs } = useNvm();
  const [nftData, setNftData] = useState({
    nftName: "",
    nftAuthor: "",
    cryptoVoxelsUrl: "https://www.cryptovoxels.com/play?coords=N@335W,136N",
    rareEffectUrl: "",
  });
  const currentDDO = DDOs[currentIndex];

  const getNftCvLink = (nftname: string) => {
    const result = nftLocationData.filter((data) => data.nftName === nftname);
    if (result.length === 0) {
      return cryptoVoxelsGenericUrl;
    }
    const link = result[0]["cvLocation"];
    if (link) return link;
    return cryptoVoxelsGenericUrl;
  };

  const getNftRareEffectLink = (nftname: string) => {
    const result = nftLocationData.filter((data) => data.nftName === nftname);
    if (result.length === 0) {
      return rareEffectGenericUrl;
    }
    const link = result[0]["rareEffectLink"];
    if (link) return link;
    return rareEffectGenericUrl;
  };

  useEffect(() => {
    if (currentDDO) {
      const nftName = currentDDO.service[0].attributes.main.name;
      const nftAuthor = currentDDO.service[0].attributes.main.author;
      let cvLocation = getNftCvLink(nftName);
      let rareEffectLink = getNftRareEffectLink(nftName);

      setNftData({
        nftName: nftName,
        nftAuthor: nftAuthor,
        cryptoVoxelsUrl: cvLocation,
        rareEffectUrl: rareEffectLink,
      });
    }
  }, [currentIndex, DDOs]);

  const { isActive } = useDocker();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <DockButton onClick={handleToggle}>
        <Emoji emoji={'🔮'} label={'dislike'} />
      </DockButton> */}
      <SlideDown className={"my-dropdown-slidedown"}>
        {isActive ? (
          <div className={styles.slider}>
            <div className={styles.cardWrapper}>
              <div className={styles.cardGrid}>
                <MetaCard
                  artworkName={nftData.nftName}
                  artist={nftData.nftAuthor}
                  description={"description"}
                  mintDate={"293847293"}
                  price={"1002"}
                />
                <div className={styles.alsoOnGrid}>
                  <AlsoOnCard
                    serviceUrl={nftData.rareEffectUrl}
                    serviceImageUrl={rareEffectImage}
                    serviceName={"RareEffectV2"}
                  />
                  <AlsoOnCard
                    serviceUrl={nftData.cryptoVoxelsUrl}
                    serviceImageUrl={cryptoVoxelsImage}
                    serviceName={"VR"}
                  />
                  <AlsoOnCard
                    serviceUrl={openSeaUrl}
                    serviceImageUrl={openSeaImage}
                    serviceName={"OpenSea"}
                  />
                  <AlsoOnCard
                    serviceUrl={openSeaUrl}
                    serviceImageUrl={openSeaImage}
                    serviceName={"OpenSea"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </SlideDown>
    </>
  );
};

export default AlsoOnDock;
