import aboveClouds from "@/assets/photos/above-clouds.jpg.asset.json";
import cliffRoad from "@/assets/photos/cliff-road.jpg.asset.json";
import duskRoad from "@/assets/photos/dusk-road.jpg.asset.json";
import fogRider from "@/assets/photos/fog-rider.jpg.asset.json";
import forestHighwayRiders from "@/assets/photos/forest-highway-riders.jpg.asset.json";
import goldenPeaks from "@/assets/photos/golden-peaks.jpg.asset.json";
import helmetProfile from "@/assets/photos/helmet-profile.jpg.asset.json";
import hillRailway from "@/assets/photos/hill-railway.jpg.asset.json";
import hillTownClouds from "@/assets/photos/hill-town-clouds.jpg.asset.json";
import mistyForestRoad from "@/assets/photos/misty-forest-road.jpg.asset.json";
import mistyHillTerraces from "@/assets/photos/misty-hill-terraces.jpg.asset.json";
import mountainOverlookBike from "@/assets/photos/mountain-overlook-bike.jpg.asset.json";
import riderCloseup from "@/assets/photos/rider-closeup.jpg.asset.json";
import riderSnowPeaks from "@/assets/photos/rider-snow-peaks.jpg.asset.json";
import riderStormMountains from "@/assets/photos/rider-storm-mountains.jpg.asset.json";
import sunsetCruiser from "@/assets/photos/sunset-cruiser.jpg.asset.json";
import switchbackRoad from "@/assets/photos/switchback-road.jpg.asset.json";
import teaGardenRoad from "@/assets/photos/tea-garden-road.jpg.asset.json";
import teaHills from "@/assets/photos/tea-hills.jpg.asset.json";
import valleyRoadRiders from "@/assets/photos/valley-road-riders.jpg.asset.json";
import heroVideo1080 from "@/assets/video/hero-ride-1080.mp4.asset.json";
import heroVideo540 from "@/assets/video/hero-ride-540.mp4.asset.json";
import heroPoster from "@/assets/video/hero-ride-poster.jpg.asset.json";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const p = (src: { url: string }, alt: string, width: number, height: number): Photo => ({
  src: src.url,
  alt,
  width,
  height,
});

export const PHOTOS = {
  aboveClouds: p(aboveClouds, "Two motorcyclists riding a mountain road above a sea of clouds", 1800, 1350),
  cliffRoad: p(cliffRoad, "Narrow mountain road carved beneath an overhanging rock cliff", 1800, 1200),
  duskRoad: p(duskRoad, "Motorcycle parked on an empty road at dusk with dark mountains ahead", 1800, 2250),
  fogRider: p(fogRider, "Black and white photograph of a touring motorcycle emerging from fog", 1800, 2699),
  forestHighwayRiders: p(forestHighwayRiders, "Group of riders on a tree-lined highway", 1800, 2054),
  goldenPeaks: p(goldenPeaks, "Snow peaks of the Himalaya glowing gold at sunrise", 1800, 1158),
  helmetProfile: p(helmetProfile, "Profile of a rider in a matte black full-face helmet", 1800, 1200),
  hillRailway: p(hillRailway, "Vintage steam hill train passing through green tea country", 1800, 1200),
  hillTownClouds: p(hillTownClouds, "Hill town on a ridge with clouds drifting through the valley", 1800, 1200),
  mistyForestRoad: p(mistyForestRoad, "Riders on a winding road through a misty forest", 1800, 1200),
  mistyHillTerraces: p(mistyHillTerraces, "Misty green hillside with terraces and small houses", 1800, 1200),
  mountainOverlookBike: p(mountainOverlookBike, "Loaded touring motorcycle parked at a mountain overlook", 1800, 2400),
  riderCloseup: p(riderCloseup, "Close-up of a rider leaning into a corner", 1800, 2881),
  riderSnowPeaks: p(riderSnowPeaks, "Adventure motorcycle parked before snow-capped mountains", 1800, 1200),
  riderStormMountains: p(riderStormMountains, "Rider standing beside an adventure motorcycle under storm clouds", 1800, 1072),
  sunsetCruiser: p(sunsetCruiser, "Rider on a cruiser motorcycle on an open highway at sunset", 1800, 1200),
  switchbackRoad: p(switchbackRoad, "Hairpin switchback road climbing a forested mountainside", 1800, 1200),
  teaGardenRoad: p(teaGardenRoad, "Winding road through bright green tea gardens", 1800, 1200),
  teaHills: p(teaHills, "Tea-covered hillside with colourful houses beneath the mist", 1800, 1350),
  valleyRoadRiders: p(valleyRoadRiders, "Motorcyclists riding a winding road through a mountain valley", 1800, 2700),
} satisfies Record<string, Photo>;

export const HERO_MEDIA = {
  video1080: heroVideo1080.url,
  video540: heroVideo540.url,
  poster: heroPoster.url,
};

export const PHOTO_CREDITS = {
  source: "Unsplash",
  license: "Unsplash License",
  url: "https://unsplash.com/license",
  video: {
    source: "Pexels",
    license: "Pexels License",
    url: "https://www.pexels.com/license/",
  },
};
