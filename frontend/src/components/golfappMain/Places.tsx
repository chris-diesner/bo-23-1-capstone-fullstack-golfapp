import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { Combobox } from '@headlessui/react'

type PlacesProps = {
    setClubs: (position: google.maps.LatLngLiteral) => void;
}
export default function Places({setClubs}: PlacesProps) {
    const {value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()

    const handleSelect = async (select: string) => {
        setValue(select, false)
        clearSuggestions()
        try {
            const results = await getGeocode({address: select})
            const {lat, lng} = await getLatLng(results[0])
            setClubs({lat, lng})
        } catch (error) {
            console.log(error)
        }
    }
    return <Combobox onChange={handleSelect}>
        <Combobox.Input value={value} onChange={e => setValue(e.target.value)} className="combobox-input" placeholder="Search for Clubs..."/>
        <Combobox.Options>
            {status === "OK" && data.map(({place_id, description}) =>
                <Combobox.Option key={place_id} value={description}>
                    {description}
                </Combobox.Option>)}
        </Combobox.Options>
    </Combobox>
}