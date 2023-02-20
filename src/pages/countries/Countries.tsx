import { useEffect, useState } from "react";
import { Order } from "../../common/models";
import { api } from "./common/api";
import * as Types from "./common/models";
import "./common/styles/countries.scss";
import { Country } from "./components/Country";

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
      const country = initialCountries.find((country) => {
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
          <button onClick={toggleRegion}>
            Show{" "}
            {region === Types.Region.ALL
              ? Types.Region.OCEANIA
              : Types.Region.ALL}
          </button>
          <button onClick={toggleArea}>
            Show{" "}
            {areaRegion === Types.Region.ALL
              ? `< ${Types.Region.LITHUANIA}`
              : Types.Region.ALL}
          </button>
        </div>
        <div className="right">
          <button onClick={toggleOrder}>
            {order} {order === Order.ASC ? "⇧" : "⇩"}
          </button>
        </div>
      </div>
      {countries.map((country) => (
        <Country key={country.name} data={country} />
      ))}
    </div>
  );
};

export { Countries };
