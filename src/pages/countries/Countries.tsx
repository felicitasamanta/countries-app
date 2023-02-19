import { useCallback, useEffect, useRef, useState } from "react";
import { Order } from "../../common/models";
import { api } from "./common/api";
import * as Types from "./common/models";
import "./common/styles/countries.scss";
import { Country } from "./components/Country";

const mockData: Types.Countries = [
  {
    name: "Virgin Islands (British)",
    region: "Oceania",
    area: 151.0,
    independent: false,
  },
  {
    name: "Virgin Islands (U.S.)",
    region: "Americas",
    area: 346.36,
    independent: false,
  },
  {
    name: "Brunei Darussalam",
    region: "Asia",
    area: 5765.0,
    independent: false,
  },
  {
    name: "Bulgaria",
    region: "Europe",
    area: 110879.0,
    independent: false,
  },
  {
    name: "Burkina Faso",
    region: "Africa",
    area: 272967.0,
    independent: false,
  },
  {
    name: "Burundi",
    region: "Africa",
    area: 27834.0,
    independent: false,
  },
  {
    name: "Cambodia",
    region: "Asia",
    area: 181035.0,
    independent: false,
  },
];

const Countries = () => {
  const [initialCountries, setInitialCountries] = useState<Types.Countries>([]);
  const [countries, setCountries] = useState<Types.Countries>([]);
  const [region, setRegion] = useState<Types.Region>(Types.Region.ALL);
  const [order, setOrder] = useState<Order>(Order.ASC);
  const [areaRegion, setAreaRegion] = useState<Types.Region>(Types.Region.ALL);

  const sortAlphabetically = (a: Types.Country, b: Types.Country) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  };

  const getCountries = async () => {
    const data = await api.getCountries();
    data.sort(sortAlphabetically);
    setInitialCountries(data);
    setCountries(data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const sortedList = [...countries].sort((a, b) => {
      const direction = order === Order.ASC ? 1 : -1;
      return direction * sortAlphabetically(a, b);
    });

    setCountries(sortedList);
  }, [order]);

  useEffect(() => {
    if (region === Types.Region.ALL) {
      setCountries(initialCountries);
    } else {
      const filteredList = countries.filter((country) => {
        return country.region === region;
      });
      setCountries(filteredList);
    }
  }, [region]);

  useEffect(() => {
    if (areaRegion === Types.Region.ALL) {
      setCountries(initialCountries);
    } else {
      const country = countries.find((country) => {
        return country.name === Types.Region.LITHUANIA;
      }) as Types.Country;
      const filteredList = countries.filter((item) => {
        return item.area < country.area;
      });
      setCountries(filteredList);
    }
  }, [areaRegion]);

  const toggleRegion = () => {
    setRegion(
      region === Types.Region.ALL ? Types.Region.OCEANIA : Types.Region.ALL
    );
  };

  const toggleOrder = () => {
    setOrder(order === Order.ASC ? Order.DESC : Order.ASC);
  };

  const toggleArea = () => {
    setAreaRegion(
      areaRegion === Types.Region.ALL
        ? Types.Region.LITHUANIA
        : Types.Region.ALL
    );
  };

  return (
    <div className="countries">
      <h1>Countries</h1>
      <div className="buttons">
        <div className="left">
          <a href="#" onClick={toggleRegion}>
            Show{" "}
            {region === Types.Region.ALL
              ? Types.Region.OCEANIA
              : Types.Region.ALL}
          </a>
          <a href="#" onClick={toggleArea}>
            Show{" "}
            {areaRegion === Types.Region.ALL
              ? `< ${Types.Region.LITHUANIA}`
              : Types.Region.ALL}
          </a>
        </div>
        <div className="right">
          <a href="#" onClick={toggleOrder}>
            {order}
          </a>
        </div>
      </div>
      {countries.map((country) => (
        <Country key={country.name} data={country} />
      ))}
    </div>
  );
};

export { Countries };
