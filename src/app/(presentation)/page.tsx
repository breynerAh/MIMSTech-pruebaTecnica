"use client";
import AudioUI from "@/components/ui/componentUI/audio/audioUI";
import { InputUI } from "@/components/ui/componentUI/input/inputUI";
import { SelectUI } from "@/components/ui/componentUI/select/selectUI";
import { Separator } from "@radix-ui/react-separator";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { TDictionary } from "./types";
import { useDispatch } from "react-redux";
import { setFont } from "@/redux/fontSlice";
import { ModalUI } from "@/components/ui/componentUI/modal/modalUI";

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState("serif");
  const [error, setError] = useState<string>("");
  const [dataApi, setDataApi] = useState<TDictionary[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [noData, setNoData] = useState<string>("");

  const dispatch = useDispatch();

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event?.target?.value?.trim()) {
      setError("El campo esta vacío.");
    } else {
      const value = event.target.value;
      setWord(value);
      setError("");
    }
  };

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement?.classList.add("dark");
    } else {
      htmlElement?.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (word !== "") {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDataApi(data);
            setNoData("");
          }
          if (data?.message) {
            setDataApi([]);
            setNoData("Not Found");
          }
        })
        .catch(() => {
          setDataApi([]);
        });
    }
  }, [word]);

  const fonts = [
    { value: "serif", label: "Serif" },
    { value: "sansSerif", label: "Sans Serif" },
    { value: "monospace", label: "Monospace" },
  ];

  useEffect(() => {
    if (selectedFont !== "") {
      dispatch(setFont(selectedFont));
    }
  }, [selectedFont, dispatch]);

  const handleHistory = () => {
    if (noData === "" && word !== "") {
      setHistory([...history, word]);
    } else {
      setHistory([...history]);
    }
  };

  return (
    <div className="h-screen overflow-auto flex flex-col px-[20%] py-[10px] bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="h-[100px] flex flex-row justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <span
            className="material-symbols-outlined text-[#9a9a9a] dark:text-white"
            style={{ fontSize: "30px" }}
          >
            book_2
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <SelectUI
            data={fonts}
            setSelectedFont={setSelectedFont}
            selectedFont={selectedFont}
          />
          <Separator
            orientation="vertical"
            className="h-[20%] w-[1px] bg-[#dadada] dark:bg-gray-700"
          />
          <Switch
            className="mr-3"
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={(checked) => setIsDarkMode(checked)}
          />
          {!isDarkMode ? (
            <span className="material-symbols-outlined text-[#9a9a9a] mr-3">
              dark_mode
            </span>
          ) : (
            <span className="material-symbols-outlined mr-3">light_mode</span>
          )}
        </div>
      </div>
      <div className="h-[50px]">
        <InputUI onBlur={handleOnBlur} />
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
      {dataApi?.length > 0 && (
        <div className="flex justify-end mt-4">
          <ModalUI
            title="Historial"
            onClick={handleHistory}
            history={history}
          />
        </div>
      )}
      {/* Body */}
      {dataApi?.length <= 0 || error ? (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <p className="mt-2">Realice su búsqueda</p>
        </div>
      ) : (
        <>
          {dataApi?.map((item, index) => {
            const newPhonetic = item?.phonetics?.find((text) => {
              return text?.text;
            });

            const newAudio = item?.phonetics?.find((audio) => {
              return audio?.audio;
            });

            return (
              <div key={`item-${index}`}>
                <div className="h-[110px] flex flex-row justify-between items-center">
                  <div>
                    <p className="text-[40px]">{item?.word}</p>
                    <p className="text-[#a702a49f]">
                      {item?.phonetic || newPhonetic?.text}
                    </p>
                  </div>
                  <AudioUI audioSrc={newAudio?.audio} />
                </div>
                <div className="flex items-center mb-4">
                  <p className="text-[16px] font-semibold mr-4">
                    {item?.meanings?.[0]?.partOfSpeech}
                  </p>
                  <Separator className="h-[1px] w-[90%] bg-[#dadada] dark:bg-gray-700" />
                </div>
                <div>
                  <p className="text-[15px] text-[#c8c8c8] mb-4 dark:text-gray-400">
                    Meaning
                  </p>
                  {item?.meanings?.[0]?.definitions?.map(
                    (definition, index) => {
                      return (
                        <ul
                          key={`key-${index}`}
                          className="text-[14px] list-disc pl-5 text-[#000] marker:text-[#a702a49f] dark:text-white"
                        >
                          <li>{definition?.definition}</li>
                        </ul>
                      );
                    }
                  )}
                  <div className="flex mt-4">
                    <p className="text-[15px] text-[#c8c8c8] mr-4 dark:text-gray-400">
                      Synonyms
                    </p>
                    <p className="text-[15px] text-[#a702a4]">
                      {item?.meanings?.[0]?.synonyms?.map((synonym) => synonym)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <p className="text-[16px] font-semibold mr-4">
                    {item?.meanings?.[1]?.partOfSpeech}
                  </p>
                  <Separator className="h-[1px] w-[90%] bg-[#dadada] dark:bg-gray-700" />
                </div>
                <div>
                  <p className="text-[15px] text-[#c8c8c8] mb-4">Meaning</p>
                  {item?.meanings?.[1]?.definitions?.map(
                    (definition, index) => {
                      return (
                        <ul
                          key={`key-${index}`}
                          className="text-[14px] list-disc pl-5 text-[#000] marker:text-[#a702a49f] dark:text-white"
                        >
                          <li>{definition?.definition}</li>
                          <p className="text-[14px] text-[#c8c8c8]">
                            {definition?.example}
                          </p>
                        </ul>
                      );
                    }
                  )}
                </div>
                <Separator className="h-[1px] w-[100%] bg-[#dadada] mt-4 dark:bg-gray-700" />
                <div className="flex flex-wrap mt-4">
                  <p className="text-[15px] text-[#c8c8c8] mr-4 dark:text-gray-400">
                    Source
                  </p>
                  <p className="text-[14px] text-[#000] dark:text-white">
                    {item?.sourceUrls?.map((source) => source)}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
