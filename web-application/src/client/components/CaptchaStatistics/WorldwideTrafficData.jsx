import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import {
  card,
  cardTitle,
  composableMap,
  subcomponent,
} from './styles.scss';
import WORLD_JSON from './world.json';

/**
 * Returns the label for the tooltip given the countryName and its associated
 * frequency value freq.
 *
 * @param {string} countryName
 * @param {number} freq
 */
const getCountryTooltipLabel = (countryName, freq) => `${countryName}: ${freq}`;

/**
 * Returns the country's frequency data by using an object that maps from the
 *
 * @param {Object} mapCountryToFreq
 * @param {string} countryCode
 */
const getCountryFrequencyData = (mapCountryToFreq, countryCode) => (
  mapCountryToFreq[countryCode] || 0
);

/**
 * Returns the maximum frequency of all the country frequencies.
 *
 * @param {Object} mapCountryToFreq
 */
const findMaxFreq = (mapCountryToFreq) => (
  Object.keys(mapCountryToFreq).reduce((prev, curr) => Math.max(prev, mapCountryToFreq[curr]), 0)
);

/**
 * Renders the WorldwideTrafficData stateless function component.
 *
 * @param {Object} props
 */
const WorldwideTrafficData = props => {
  const maxFreq = findMaxFreq(props.mapCountryToFreq);
  const colorScale = scaleLinear().domain([0, maxFreq]).range(['#CFD8DC', '#37474F']);

  return (
    <Container fluid className={subcomponent}>
      <Row>
        <Col md="2" />
        <Col md="8">
          <div className={card}>
            <div className={cardTitle}>{props.title}</div>
            <ComposableMap
              projectionConfig={{
                scale: 200,
                rotation: [-11, 0, 0],
              }}
              width={980}
              height={551}
              className={composableMap}
            >
              <Geographies geography={WORLD_JSON}>
                {(geographies, projection) => geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    data-tip={getCountryTooltipLabel(
                      geography.properties.name,
                      getCountryFrequencyData(props.mapCountryToFreq, geography.properties.iso_a3),
                    )}
                    geography={geography}
                    projection={projection}
                    onClick={() => { console.log(geography.properties.iso_a3); }}
                    style={{
                      default: {
                        fill: colorScale(getCountryFrequencyData(
                          props.mapCountryToFreq,
                          geography.properties.iso_a3,
                        )),
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                ))}
              </Geographies>
            </ComposableMap>
            <ReactTooltip />
          </div>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

WorldwideTrafficData.propTypes = {
  title: PropTypes.string,
  mapCountryToFreq: PropTypes.object,
};

export default WorldwideTrafficData;
