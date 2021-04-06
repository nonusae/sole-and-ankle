import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const SpecialLabel = {
  'on-sale': {
    name: 'Sale',
    '--background-color': COLORS.primary,
    '--display': 'block'
  },
  'new-release': {
    name: 'Just Released!',
    '--background-color': COLORS.secondary,
    '--display': 'block'
  },
  'default': {
    '--display': 'none'
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const isOnSale = variant === 'on-sale'

  const label = SpecialLabel[variant]

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <SpecialTag style={label}>
            {label.name}
          </SpecialTag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={isOnSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { isOnSale && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex-basis: 340px;
  flex-grow: 1;

  &:last-of-type {
    flex-basis: 100%;
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${({isOnSale}) => isOnSale && COLORS.gray[700]};
  text-decoration: ${({isOnSale}) => isOnSale && 'line-through'}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const SpecialTag = styled.div`
  position: absolute;
  display: var(--display);
  text-align: center;
  top: 12px;
  right: -4px;
  padding: 7px 9px 9px 11px;
  color: white;
  background-color: var(--background-color);
  border-radius 2px;
  font-weight: ${WEIGHTS['bold']}
`

export default ShoeCard;
