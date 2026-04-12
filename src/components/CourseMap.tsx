"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Link from "next/link";
import type { GolfCourse } from "@/types";
import "leaflet/dist/leaflet.css";

interface Props {
  courses: Pick<GolfCourse, "slug" | "name" | "country" | "ranking" | "coordinates" | "greenFee">[];
}

export function CourseMap({ courses }: Props) {
  useEffect(() => {
    // Fix default icon paths broken by webpack
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[30, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", background: "#0f1117" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {courses.map((course) => (
        <CircleMarker
          key={course.slug}
          center={[course.coordinates.lat, course.coordinates.lng]}
          radius={8}
          pathOptions={{
            color: "#295336",
            fillColor: "#295336",
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup className="course-map-popup">
            <div className="min-w-[180px] p-1">
              {course.ranking && (
                <p className="text-xs font-semibold text-[#295336] mb-0.5">#{course.ranking} Ranked</p>
              )}
              <p className="font-bold text-sm text-gray-900 leading-tight">{course.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-2">{course.country}</p>
              <p className="text-xs text-gray-700 mb-3">
                Green fee: {course.greenFee.currency} {course.greenFee.min.toLocaleString()}
                {course.greenFee.min !== course.greenFee.max && `–${course.greenFee.max.toLocaleString()}`}
              </p>
              <Link
                href={`/courses/${course.slug}`}
                className="block text-center text-xs font-semibold bg-[#1a1a1a] text-white px-3 py-1.5 rounded-md hover:bg-[#295336] transition-colors"
              >
                View Course →
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
