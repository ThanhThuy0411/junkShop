package js.junkShop.enumration;

public enum FileType
{
    Image("image",0),
    Audio("audio",1),
    Video("video",2),
    Document("document",3);

   private final String key;
   private final Integer value;

    FileType(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public Integer getValue() {
        return value;
    }
}
