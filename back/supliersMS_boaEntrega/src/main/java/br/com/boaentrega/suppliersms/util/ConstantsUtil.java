package br.com.boaentrega.suppliersms.util;

public interface ConstantsUtil {
    public interface Connections{
        public static final String AUTHORIZATION = "Authorization";
        public static final String CONTENT_TYPE = "Content-Type";
        public static final String ACCEPT = "Accept";

        public interface RestMethods{
            public static final String GET = "GET";
            public static final String POST = "POST";
        }

        public interface HttpsStatus{
            public static final int SUCCESS = 200;
            public static final int BAD_REQUEST = 400;
            public static final int ERROR = 500;
        }
    }
}
