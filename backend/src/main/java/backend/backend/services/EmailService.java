package backend.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String apiKey;

    public boolean sendVerificationEmail(String to, String verificationLink) {
        Resend resend = new Resend(apiKey);

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("YourApp <no-reply@yourdomain.com>")
                .to(to)
                .subject("Verify your email")
                .html("<p>Click <a href=\"" + verificationLink + "\">here</a> to verify your email.</p>")
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(params);
            return response != null && response.getId() != null;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}