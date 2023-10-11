class Api {
  public get(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "get" });
  }

  public post(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "post" });
  }

  public patch(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "PATCH" });
  }

  public put(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "put" });
  }

  public update(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "update" });
  }

  public delete(url: string, options?: RequestInit): Promise<any> {
    return this.sendRequest(url, { ...options, method: "delete" });
  }

  private async sendRequest(url: string, options?: RequestInit): Promise<Response> {
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
      "X-Requested-With": "XMLHttpRequest",
      mode: "cors",
      "Accept-Language": "nl",
    };

    const result = await fetch(url, {
      ...options,
      headers,
    })
      .then((e) => {
        return e.json();
      })
      .catch((e) => {
        return e;
      });

    return result;
  }
}

export const api = new Api();
