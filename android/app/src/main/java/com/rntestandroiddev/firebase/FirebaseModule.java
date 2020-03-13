package com.rntestandroiddev.firebase;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class FirebaseModule extends ReactContextBaseJavaModule {

    FirebaseModule(ReactApplicationContext context) {
        super(context);
        mReactContext = context;
    }
    
    // TODO: Ensure to make this method callable in Javascript!
    public void testCrash() {
        throw new RuntimeException("Test Crash");
    }

    @Override
    public String getName() {
        return "Firebase";
    }
}