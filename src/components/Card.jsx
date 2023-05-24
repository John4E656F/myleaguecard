import React, { useState, useEffect } from 'react';

function Card({ backgroundImage, summoner, data, roleImages }) {
  return (
    <div className='card'>
      <div
        className='background'
        style={{
          zIndex: 1,
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='overlay'>
          <div className='details'>
            {summoner && data ? (
              <>
                <div className='cardHeader'>
                  <h1 className='username'>{summoner.name}</h1>
                  <img src={roleImages.fill.assets} alt={roleImages.fill.name} className='rank' />
                </div>
                <div className='divider' />
                <div className='rankDetails'>
                  <div className='eloDetails'>
                    <p>League Point: {data.lp}</p>
                    <div className='elo'>
                      <p>Wins: {data.wins}</p>
                      <p>Losses: {data.losses}</p>
                    </div>
                    <p>Winrate: {data.winrate}%</p>
                  </div>
                  <img src={data.tierImage} alt={data.tier} className='tier' />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
