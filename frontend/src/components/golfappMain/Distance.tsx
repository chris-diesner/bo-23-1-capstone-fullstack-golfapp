type DistanceProps = {
    leg: google.maps.DirectionsLeg
}

export default function Distance({leg}: DistanceProps) {
    return <div className="distance">
        Distance: {leg.distance?.text}
    </div>
}